import React, { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomDialog from "./CustomDialog";

 const initialNodes = [
   {
     id: "1",
     position: { x: 138, y: 0 },
     type: "customNode",
   },
   {
     id: "2",
     data: { label: "sequence start point" },
     position: { x: 100, y: 200 },
   },
   {
    id:"3",
    position:{x:138,y:350},
    type:"customNode"
   }
 ];

 const initialEdges = [
   {
     id: "e1-2",
     source: "2",
     target: "3",
     type: "default",
     animated: true, // Optional: makes the edge animated
    //  label: "Connection",
   },
 ];

function Canvas() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );
    const nodeTypes = {
        customNode:CustomDialog
    }
   
    
    const handleShowModal = ()=>{
        
    }
    
    return (
        <>
      <main className="h-screen w-full flex flex-col">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          
          fitView
        >
          <MiniMap />
          <Background />
          <Controls />
        </ReactFlow>
      </main>
    </>
  );
}

export default Canvas;
