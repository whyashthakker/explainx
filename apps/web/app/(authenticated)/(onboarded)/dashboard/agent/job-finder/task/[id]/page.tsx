"use client";
import { use } from "react";
import JobTaskDetails from "../../../../../../../_components/job-task-details";



export default function Task({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); 
    return <JobTaskDetails taskId={id}></JobTaskDetails>;
}