"use client";

export default function GlobalBubbles() {
  return (
    <div className="bubble bubble-xl absolute top-1/2 left-1/2 bg-red-500">

      {/* LARGE BUBBLES */}
      <div className="bubble bubble-xl absolute top-24 left-10" />
      <div className="bubble bubble-lg absolute top-1/3 right-20" />
      <div className="bubble bubble-lg absolute bottom-32 left-1/4" />

      {/* MEDIUM */}
      <div className="bubble bubble-md absolute top-1/2 left-1/3" />
      <div className="bubble bubble-md absolute bottom-20 right-1/3" />

      {/* SMALL */}
      <div className="bubble bubble-sm absolute top-40 right-10" />
      <div className="bubble bubble-sm absolute bottom-40 left-20" />
      <div className="bubble bubble-xs absolute top-2/3 right-1/4" />

    </div>
  );
}
