"use client";
import { use } from "react";

export default function TaskDetails({ params }: { params: Promise<{ task_id: string }> }) {
    const { task_id } = use(params); 
    return <div>Task ID: {task_id}</div>;
}
