"use client";
import { use } from "react";
import TaskDetails from "../../../../../../../_components/real-estate-task-deatils";


export default function Task({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); 
    return <TaskDetails taskId={id}></TaskDetails>;
}