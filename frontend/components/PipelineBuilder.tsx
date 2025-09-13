"use client";
import React, { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Filter,
  Cpu,
  Activity,
  Plus,
  Play,
  Save,
  Download,
  Trash2,
  Settings,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { DataSourceUpload } from "./DataSourceUpload";
import { trainModel } from "./pipeline-utils/TrainModel";
import { evaluateModel } from "./pipeline-utils/EvaluateModel";
import { cleanData } from "./pipeline-utils/CleanData";

interface Node {
  id: string;
  type: "data" | "preprocessing" | "model" | "evaluation";
  label: string;
  position: { x: number; y: number };
  output?: string | File;
}

interface Connection {
  from: string;
  to: string;
}

const nodeTypes = [
  { type: "data", label: "Data Source", icon: Database, color: "bg-blue-500 border-blue-500" },
  { type: "preprocessing", label: "Preprocessing", icon: Filter, color: "bg-green-500 border-green-500" },
  { type: "model", label: "Model Training", icon: Cpu, color: "bg-purple-500 border-purple-500" },
  { type: "evaluation", label: "Evaluation", icon: Activity, color: "bg-orange-500 border-orange-500" },
];

export const PipelineBuilder = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", type: "data", label: "CSV Dataset", position: { x: 100, y: 100 } },
    { id: "2", type: "preprocessing", label: "Data Cleaning", position: { x: 350, y: 100 } },
    { id: "3", type: "model", label: "Random Forest", position: { x: 600, y: 100 } },
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { from: "1", to: "2" },
    { from: "2", to: "3" },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [tempConnection, setTempConnection] = useState<{ x: number; y: number } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionProgress, setExecutionProgress] = useState<Record<string, "running" | "completed">>({});
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  /** --- Node & Pipeline Operations --- */
  const addNode = (type: Node["type"]) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type,
      label: nodeTypes.find((nt) => nt.type === type)?.label || "New Node",
      position: { x: 200, y: 200 },
    };
    setNodes([...nodes, newNode]);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter((n) => n.id !== nodeId));
    setConnections(connections.filter((c) => c.from !== nodeId && c.to !== nodeId));
  };

  const getInputData = (nodeId: string) => {
    const incoming = connections.filter(c => c.to === nodeId);
    return incoming.map(c => nodes.find(n => n.id === c.from)?.output);
  };

  const runNode = async (node: Node) => {
    const inputs = getInputData(node.id);
    let result;
    switch (node.type) {
      case "data": result = node.output || null; break;
      case "preprocessing": result = await cleanData(inputs[0]); break;
      case "model": result = await trainModel(inputs[0]); break;
      case "evaluation": result = await evaluateModel(inputs[0]); break;
    }
    setNodes(prev => prev.map(n => n.id === node.id ? { ...n, output: result } : n));
    return result;
  };

  const runPipeline = async () => {
    if (!nodes.length) return;
    setIsRunning(true);
    setExecutionProgress({});

    const sortedNodes = [...nodes].sort((a, b) => {
      const aConns = connections.filter(c => c.to === a.id).length;
      const bConns = connections.filter(c => c.to === b.id).length;
      return aConns - bConns;
    });

    for (const node of sortedNodes) {
      setExecutionProgress(prev => ({ ...prev, [node.id]: "running" }));
      await runNode(node);
      setExecutionProgress(prev => ({ ...prev, [node.id]: "completed" }));
    }
    setIsRunning(false);
  };

  /** --- Zoom & Pan --- */
  const handleZoom = (delta: number, clientX?: number, clientY?: number) => {
    setZoom(prev => {
      const newZoom = Math.min(Math.max(prev + delta * 0.1, 0.2), 3);
      if (clientX !== undefined && clientY !== undefined && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const offsetX = (clientX - rect.left - panOffset.x) / prev;
        const offsetY = (clientY - rect.top - panOffset.y) / prev;
        setPanOffset({ x: panOffset.x - offsetX * (newZoom - prev), y: panOffset.y - offsetY * (newZoom - prev) });
      }
      return newZoom;
    });
  };

  const getScreenPosition = useCallback(
    (clientX: number, clientY: number) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return { x: (clientX - rect.left - panOffset.x) / zoom, y: (clientY - rect.top - panOffset.y) / zoom };
    },
    [zoom, panOffset]
  );

  /** --- Node Drag & Connect --- */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      if (isConnecting) return;
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;
      setSelectedNode(nodeId);
      setIsDragging(true);
      const screenPos = getScreenPosition(e.clientX, e.clientY);
      setDragOffset({ x: screenPos.x - node.position.x, y: screenPos.y - node.position.y });
    },
    [nodes, isConnecting, getScreenPosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isConnecting && tempConnection) {
        setTempConnection(getScreenPosition(e.clientX, e.clientY));
        return;
      }
      if (!isDragging || !selectedNode) return;
      const screenPos = getScreenPosition(e.clientX, e.clientY);
      setNodes(nodes.map(n => n.id === selectedNode ? { ...n, position: { x: screenPos.x - dragOffset.x, y: screenPos.y - dragOffset.y } } : n));
    },
    [isDragging, selectedNode, dragOffset, nodes, isConnecting, tempConnection, getScreenPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (isConnecting) {
      setIsConnecting(false); setConnectionStart(null); setTempConnection(null); return;
    }
    setIsDragging(false); setSelectedNode(null);
  }, [isConnecting]);

  const handleConnectionStart = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation(); setIsConnecting(true); setConnectionStart(nodeId);
    setTempConnection(getScreenPosition(e.clientX, e.clientY));
  };

  const handleConnectionEnd = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      const exists = connections.find(c => (c.from === connectionStart && c.to === nodeId) || (c.from === nodeId && c.to === connectionStart));
      if (!exists) setConnections([...connections, { from: connectionStart, to: nodeId }]);
    }
    setIsConnecting(false); setConnectionStart(null); setTempConnection(null);
  };

  /** --- Canvas Events --- */
  const handleWheel = (e: React.WheelEvent) => { e.preventDefault(); handleZoom(e.deltaY < 0 ? 1 : -1, e.clientX, e.clientY); };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest(".node-card, .connection-point")) return;
    setIsPanning(true); setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanning && panStart && !isDragging) { setPanOffset({ x: e.clientX - panStart.x, y: e.clientY - panStart.y }); return; }
    if (isDragging || isConnecting) handleMouseMove(e);
  };

  const handleCanvasMouseUp = () => { setIsPanning(false); setPanStart(null); handleMouseUp(); };

  const getNodeIcon = (type: Node["type"]) => nodeTypes.find(nt => nt.type === type)?.icon || Database;
  const getNodeColor = (type: Node["type"]) => nodeTypes.find(nt => nt.type === type)?.color || "bg-gray-500 border-gray-500";

  return (
    <div className="h-full flex bg-[#10141a] text-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-[#23283a] bg-[#181c27] p-6 shadow-xl">
        <h3 className="font-semibold mb-4 text-[#e0e7ef]">Pipeline Components</h3>
        <div className="space-y-3 mb-6">
          {nodeTypes.map(nt => (
            <Button
              key={nt.type}
              variant="outline"
              className="w-full justify-start gap-2 h-12 border-[#23283a] bg-[#23283a] hover:bg-[#23283a]/80 text-[#e0e7ef] transition"
              onClick={() => addNode(nt.type as Node["type"])}
            >
              <nt.icon className="h-5 w-5" /> {nt.label} <Plus className="h-4 w-4 ml-auto" />
            </Button>
          ))}
        </div>

        <div className="border-t border-[#23283a] pt-4 mb-4">
          <h4 className="font-medium mb-3 text-[#e0e7ef]">Canvas Controls</h4>
          <div className="flex gap-2 mb-3">
            <Button variant="outline" size="sm" className="border-[#23283a] bg-[#23283a] text-[#e0e7ef]" onClick={() => handleZoom(1)}><ZoomIn className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" className="border-[#23283a] bg-[#23283a] text-[#e0e7ef]" onClick={() => handleZoom(-1)}><ZoomOut className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" className="border-[#23283a] bg-[#23283a] text-[#e0e7ef]" onClick={() => { setZoom(1); setPanOffset({ x: 0, y: 0 }); }}><RotateCcw className="h-4 w-4" /></Button>
          </div>
          <div className="text-xs text-[#7a88a1]">Zoom: {Math.round(zoom * 100)}%</div>
        </div>

        <div className="border-t border-[#23283a] pt-4">
          <h4 className="font-medium mb-3 text-[#e0e7ef]">Pipeline Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full gap-2 border-[#23283a] bg-[#23283a] text-[#e0e7ef]"><Save className="h-4 w-4" /> Save Pipeline</Button>
            <Button variant="outline" size="sm" className="w-full gap-2 border-[#23283a] bg-[#23283a] text-[#e0e7ef]"><Download className="h-4 w-4" /> Export Code</Button>
            <Button size="sm" className="w-full gap-2 bg-gradient-to-r from-[#00f6ff] to-[#3b82f6] text-[#10141a] font-bold shadow-lg" onClick={runPipeline} disabled={isRunning || nodes.length === 0}>
              <Play className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} /> {isRunning ? "Running..." : "Run Pipeline"}
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden bg-[#10141a]" onWheel={handleWheel}>
        <div ref={canvasRef} className="w-full h-full relative cursor-move select-none" onMouseDown={handleCanvasMouseDown} onMouseMove={handleCanvasMouseMove} onMouseUp={handleCanvasMouseUp} onMouseLeave={handleCanvasMouseUp}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 60% 40%, #23283a 0%, #10141a 100%)`, zIndex: 0 }} />
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.07) 1px, transparent 1px)`, backgroundSize: `${32 * zoom}px ${32 * zoom}px`, transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }} />
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)`, backgroundSize: `${64 * zoom}px ${64 * zoom}px`, transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }} />

          <div className="absolute inset-0" style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})` }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <defs>
                <marker id="arrowhead" markerWidth="28" markerHeight="28" refX="18" refY="14" orient="auto" markerUnits="userSpaceOnUse">
                  <polygon points="0,0 28,14 0,28" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
                </marker>
              </defs>
              {connections.map((c, i) => {
                const fromNode = nodes.find(n => n.id === c.from);
                const toNode = nodes.find(n => n.id === c.to);
                if (!fromNode || !toNode) return null;
                const fromX = fromNode.position.x + 320;
                const fromY = fromNode.position.y + 60;
                const toX = toNode.position.x;
                const toY = toNode.position.y + 60;
                const dx = Math.max(120, Math.abs(toX - fromX) / 1.8);
                const c1x = fromX + dx, c1y = fromY;
                const c2x = toX - dx, c2y = toY;
                return <path key={i} d={`M ${fromX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toX} ${toY}`} stroke="#3b82f6" strokeWidth="5" fill="none" markerEnd="url(#arrowhead)" />;
              })}
              {isConnecting && connectionStart && tempConnection && (() => {
                const fromNode = nodes.find(n => n.id === connectionStart);
                if (!fromNode) return null;
                const fromX = fromNode.position.x + 320;
                const fromY = fromNode.position.y + 60;
                const toX = tempConnection.x;
                const toY = tempConnection.y;
                const dx = Math.max(120, Math.abs(toX - fromX) / 1.8);
                const c1x = fromX + dx, c1y = fromY;
                const c2x = toX - dx, c2y = toY;
                return <path d={`M ${fromX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toX} ${toY}`} stroke="#3b82f6" strokeWidth="4" strokeDasharray="10,8" fill="none" />;
              })()}
            </svg>

            {nodes.map(node => {
              const Icon = getNodeIcon(node.type);
              return (
                <Card
                  key={node.id}
                  className={`absolute w-80 p-4 cursor-grab active:cursor-grabbing transition-transform duration-200 hover:scale-[1.04] hover:shadow-2xl rounded-xl border-2 ${selectedNode === node.id ? "border-blue-400" : "border-[#23283a]"} ${getNodeColor(node.type)} bg-[#181c27] shadow-lg ${executionProgress[node.id] === "running" ? "ring-4 ring-yellow-400/80 animate-pulse" : ""} ${executionProgress[node.id] === "completed" ? "ring-4 ring-green-500/80" : ""}`}
                  style={{ left: node.position.x, top: node.position.y, zIndex: selectedNode === node.id ? 10 : 1 }}
                  onMouseDown={e => handleMouseDown(e, node.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-[#e0e7ef]"><Icon className="h-5 w-5" /> <span className="font-medium">{node.label}</span></div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-[#7a88a1] hover:text-[#00f6ff]"><Settings className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:text-destructive" onClick={() => deleteNode(node.id)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-[#23283a] text-[#00f6ff] border-[#00f6ff55]">{node.type}</Badge>
                    {executionProgress[node.id] === "running" && <Badge variant="default" className="text-xs bg-yellow-500">Running</Badge>}
                    {executionProgress[node.id] === "completed" && <Badge variant="default" className="text-xs bg-green-500">Completed</Badge>}
                  </div>

                  {node.type === "data" && (
                    <div className="mt-4">
                      <DataSourceUpload onUpload={fileOrUrl => setNodes(prev => prev.map(n => n.id === node.id ? { ...n, output: fileOrUrl } : n))} />
                    </div>
                  )}

                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center z-2">
                    <div className="w-5 h-5 bg-[#00f6ff] rounded-full border-2 border-[#23283a] shadow-lg opacity-90 hover:opacity-100 cursor-crosshair hover:scale-125 transition-all duration-150 connection-point"
                      onMouseDown={e => handleConnectionStart(e, node.id)} onMouseUp={e => handleConnectionEnd(e, node.id)} title="Input" />
                  </div>
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center z-2">
                    <div className="w-5 h-5 bg-[#00f6ff] rounded-full border-2 border-[#23283a] shadow-lg opacity-90 hover:opacity-100 cursor-crosshair hover:scale-125 transition-all duration-150 connection-point"
                      onMouseDown={e => handleConnectionStart(e, node.id)} onMouseUp={e => handleConnectionEnd(e, node.id)} title="Output" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
