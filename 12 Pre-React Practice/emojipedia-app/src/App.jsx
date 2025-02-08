import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";

function mapEmoji(emot) {
  return (
    <Entry
      key={emot.id}
      emoji={emot.emoji}
      name={emot.name}
      meaning={emot.meaning}
    />
  )
}

export default function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
      {emojipedia.map(mapEmoji)}
      </dl>
    </div>
  );
}