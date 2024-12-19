"use client";

import { PlayIcon } from "lucide-react";
import { Modal, useModal } from "./modal";

export function VideoDemo() {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div
        className="group absolute inset-0 flex cursor-pointer items-center justify-center duration-500 hover:bg-white hover:bg-opacity-30 lg:rounded-2xl shadow-lg shadow-teal-500/50"
        onClick={openModal}
      >
        <div className="inline-flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-blue-400 text-slate-50 shadow-lg transition-transform focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 group-hover:scale-125 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300">
          <PlayIcon className="h-7 w-7" />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        hideModal={closeModal}
        padding="none"
        size="6xl"
        backdropClass="backdrop-blur bg-white/80"
      >
        <iframe
          className="aspect-video h-full w-full rounded-lg"
          src="https://www.youtube.com/embed/CemuzMg9IOg?autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Modal>
    </>
  );
}