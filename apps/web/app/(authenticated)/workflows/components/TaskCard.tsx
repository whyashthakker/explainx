import { useDrag, useDrop } from 'react-dnd';
import { TaskStatus } from '@prisma/client';

interface TaskCardProps {
  task: {
    id: string;
    description: string;
    agentId: string | null;
    expectedOutput: string;
    asyncExecution: boolean;
    crewId: string | null;
    status: TaskStatus;
    result: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  index?: number;
  moveTask?: (dragIndex: number, hoverIndex: number) => void;
}

export function TaskCard({ task, index = 0, moveTask }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    hover: (item: { index: number }) => {
      if (item.index !== index && moveTask) {
        moveTask(item.index, index);
        item.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className={`p-4 border rounded-lg mb-2 ${isDragging ? 'opacity-50' : ''}`}
    >
      <p>{task.description}</p>
      {task.agentId && <span className="text-sm text-gray-500">Assigned to agent</span>}
    </div>
  );
}