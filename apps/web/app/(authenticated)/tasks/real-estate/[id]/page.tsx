"use client";
import { use } from "react";
import TaskDetails from "../../../../_components/Taskdetails";

export default function Task({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); 
    return <TaskDetails taskId={id}></TaskDetails>;
}