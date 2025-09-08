import React, { useState, useRef, useCallback } from 'react';
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
  RotateCcw
} from "lucide-react";

interface Node {
  id: string;
  type: 'data' | 'preprocessing' | 'model' | 'evaluation';
  label: string;
  position: { x: number; y: number };
  connected?: string[];
}

interface Connection {
  from: string;
  to: string;
}

const nodeTypes = [
  { type: 'data', label: 'Data Source', icon: Database, color: 'bg-blue-500/20 border-blue-500/50' },
  { type: 'preprocessing', label: 'Preprocessing', icon: Filter, color: 'bg-green-500/20 border-green-500/50' },
  { type: 'model', label: 'Model Training', icon: Cpu, color: 'bg-purple-500/20 border-purple-500/50' },
  { type: 'evaluation', label: 'Evaluation', icon: Activity, color: 'bg-orange-500/20 border-orange-500/50' }
];

export const PipelineBuilder = () => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: '1',
      type: 'data',
      label: 'CSV Dataset',
      position: { x: 100, y: 100 }
    },
    {
      id: '2',
      type: 'preprocessing',
      label: 'Data Cleaning',
      position: { x: 350, y: 100 }
    },
    {
      id: '3',
      type: 'model',
      label: 'Random Forest',
      position: { x: 600, y: 100 }
    }
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { from: '1', to: '2' },
    { from: '2', to: '3' }
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
  const [executionProgress, setExecutionProgress] = useState<Record<string, 'pending' | 'running' | 'completed' | 'error'>>({});
  const canvasRef = useRef<HTMLDivElement>(null);

  const addNode = (type: Node['type']) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type,
      label: nodeTypes.find(nt => nt.type === type)?.label || 'New Node',
      position: { x: 200, y: 200 }
    };
    setNodes([...nodes, newNode]);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.2));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const getScreenPosition = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    
    return {
      x: (clientX - rect.left - panOffset.x) / zoom,
      y: (clientY - rect.top - panOffset.y) / zoom
    };
  };

  const handleConnectionStart = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsConnecting(true);
    setConnectionStart(nodeId);
    const pos = getScreenPosition(e.clientX, e.clientY);
    setTempConnection(pos);
  };

  const handleConnectionEnd = (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      const newConnection: Connection = { from: connectionStart, to: nodeId };
      // Check if connection already exists
      const exists = connections.find(c => 
        (c.from === newConnection.from && c.to === newConnection.to) ||
        (c.from === newConnection.to && c.to === newConnection.from)
      );
      
      if (!exists) {
        setConnections([...connections, newConnection]);
      }
    }
    setIsConnecting(false);
    setConnectionStart(null);
    setTempConnection(null);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    if (isConnecting) return;
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    setSelectedNode(nodeId);
    setIsDragging(true);
    
    const screenPos = getScreenPosition(e.clientX, e.clientY);
    setDragOffset({
      x: screenPos.x - node.position.x,
      y: screenPos.y - node.position.y
    });
  }, [nodes, isConnecting, zoom, panOffset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isConnecting && tempConnection) {
      const pos = getScreenPosition(e.clientX, e.clientY);
      setTempConnection(pos);
      return;
    }

    if (!isDragging || !selectedNode) return;

    const screenPos = getScreenPosition(e.clientX, e.clientY);
    const newX = screenPos.x - dragOffset.x;
    const newY = screenPos.y - dragOffset.y;

    setNodes(nodes.map(node =>
      node.id === selectedNode
        ? { ...node, position: { x: newX, y: newY } }
        : node
    ));
  }, [isDragging, selectedNode, dragOffset, nodes, isConnecting, tempConnection, zoom, panOffset]);

  const handleMouseUp = useCallback(() => {
    if (isConnecting) {
      setIsConnecting(false);
      setConnectionStart(null);
      setTempConnection(null);
      return;
    }
    
    setIsDragging(false);
    setSelectedNode(null);
  }, [isConnecting]);

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
  };

  const runPipeline = async () => {
    if (nodes.length === 0) return;
    
    setIsRunning(true);
    setExecutionProgress({});
    
    // Simulate pipeline execution
    const sortedNodes = [...nodes].sort((a, b) => {
      // Simple topological sort based on connections
      const aConnections = connections.filter(c => c.to === a.id).length;
      const bConnections = connections.filter(c => c.to === b.id).length;
      return aConnections - bConnections;
    });
    
    for (const node of sortedNodes) {
      setExecutionProgress(prev => ({ ...prev, [node.id]: 'running' }));
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      setExecutionProgress(prev => ({ ...prev, [node.id]: 'completed' }));
    }
    
    setIsRunning(false);
    setTimeout(() => setExecutionProgress({}), 3000);
  };

  const getNodeIcon = (type: Node['type']) => {
    const nodeType = nodeTypes.find(nt => nt.type === type);
    return nodeType?.icon || Database;
  };

  const getNodeColor = (type: Node['type']) => {
    const nodeType = nodeTypes.find(nt => nt.type === type);
    return nodeType?.color || 'bg-gray-500/20 border-gray-500/50';
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card/30 p-6">
        <h3 className="font-semibold mb-4">Pipeline Components</h3>
        
        <div className="space-y-3 mb-6">
          {nodeTypes.map((nodeType) => (
            <Button
              key={nodeType.type}
              variant="outline"
              className="w-full justify-start gap-2 h-12"
              onClick={() => addNode(nodeType.type as Node['type'])}
            >
              <nodeType.icon className="h-5 w-5" />
              {nodeType.label}
              <Plus className="h-4 w-4 ml-auto" />
            </Button>
          ))}
        </div>

        <div className="border-t border-border pt-4 mb-4">
          <h4 className="font-medium mb-3">Canvas Controls</h4>
          <div className="flex gap-2 mb-3">
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleResetZoom}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Zoom: {Math.round(zoom * 100)}%
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="font-medium mb-3">Pipeline Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Save className="h-4 w-4" />
              Save Pipeline
            </Button>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Export Code
            </Button>
            <Button 
              size="sm" 
              className="w-full gap-2 bg-gradient-primary" 
              onClick={runPipeline}
              disabled={isRunning || nodes.length === 0}
            >
              <Play className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Running...' : 'Run Pipeline'}
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden bg-canvas-bg">
        <div 
          ref={canvasRef}
          className="w-full h-full relative cursor-move"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
              transform: `translate(${panOffset.x}px, ${panOffset.y}px)`
            }}
          />

          {/* Canvas Container with Zoom */}
          <div 
            className="absolute inset-0"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`
            }}
          >
            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="hsl(var(--connection-line))"
                  />
                </marker>
              </defs>
              {connections.map((connection, index) => {
                const fromNode = nodes.find(n => n.id === connection.from);
                const toNode = nodes.find(n => n.id === connection.to);
                
                if (!fromNode || !toNode) return null;

                const x1 = fromNode.position.x + 300; // Right edge of node
                const y1 = fromNode.position.y + 40;  // Node height / 2
                const x2 = toNode.position.x; // Left edge of node
                const y2 = toNode.position.y + 40;

                const controlX1 = x1 + (x2 - x1) * 0.5;
                const controlX2 = x1 + (x2 - x1) * 0.5;

                return (
                  <path
                    key={index}
                    d={`M ${x1} ${y1} C ${controlX1} ${y1} ${controlX2} ${y2} ${x2} ${y2}`}
                    stroke="hsl(var(--connection-line))"
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    className="drop-shadow-sm"
                  />
                );
              })}
              
              {/* Temporary connection while dragging */}
              {isConnecting && connectionStart && tempConnection && (() => {
                const fromNode = nodes.find(n => n.id === connectionStart);
                if (!fromNode) return null;
                
                const x1 = fromNode.position.x + 150;
                const y1 = fromNode.position.y + 40;
                const x2 = tempConnection.x;
                const y2 = tempConnection.y;
                
                return (
                  <path
                    d={`M ${x1} ${y1} L ${x2} ${y2}`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                    className="opacity-70"
                  />
                );
              })()}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const Icon = getNodeIcon(node.type);
              return (
                <Card
                  key={node.id}
                  className={`absolute w-80 p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-glow ${
                    selectedNode === node.id ? 'ring-2 ring-primary shadow-glow' : ''
                  } ${getNodeColor(node.type)} ${
                    executionProgress[node.id] === 'running' ? 'ring-2 ring-yellow-500 animate-pulse' : ''
                  } ${
                    executionProgress[node.id] === 'completed' ? 'ring-2 ring-green-500' : ''
                  }`}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                    transform: selectedNode === node.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{node.label}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 hover:text-destructive"
                        onClick={() => deleteNode(node.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {node.type}
                    </Badge>
                    {executionProgress[node.id] === 'running' && (
                      <Badge variant="default" className="text-xs bg-yellow-500">
                        Running
                      </Badge>
                    )}
                    {executionProgress[node.id] === 'completed' && (
                      <Badge variant="default" className="text-xs bg-green-500">
                        Completed
                      </Badge>
                    )}
                  </div>
                  
                  {/* Connection points */}
                  <div 
                    className="absolute -left-2 top-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background opacity-60 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-125 z-10"
                    onMouseDown={(e) => handleConnectionStart(e, node.id)}
                    onMouseUp={(e) => handleConnectionEnd(e, node.id)}
                    title="Input connection point"
                  />
                  <div 
                    className="absolute -right-2 top-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background opacity-60 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-125 z-10"
                    onMouseDown={(e) => handleConnectionStart(e, node.id)}
                    onMouseUp={(e) => handleConnectionEnd(e, node.id)}
                    title="Output connection point"
                  />
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};