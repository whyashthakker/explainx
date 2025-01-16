import { useDrag } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
  };
  onSelect: (agent: any) => void;
  selected: boolean;
}

export function AgentCard({ agent, onSelect, selected }: AgentCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'AGENT',
    item: agent,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(node);
        }
      }}
      className={`p-4 border rounded-lg cursor-move ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => onSelect(agent)}
    >
      <h3 className="font-semibold">{agent.name}</h3>
      <p className="text-sm text-gray-600">{agent.description}</p>
    </div>
  );
} 