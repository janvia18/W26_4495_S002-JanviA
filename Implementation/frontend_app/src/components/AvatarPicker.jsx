export default function AvatarPicker({ value, onChange }) {
  return (
    <div className="avatarGrid">
      {AVATARS.map((a) => (
        <button
          key={a.id}
          type="button"
          className={value === a.id ? "avatarBtn active" : "avatarBtn"}
          onClick={() => onChange(a.id)}
        >
          <div className="avatarEmoji">{a.emoji}</div>
          <div className="avatarLabel">{a.label}</div>
        </button>
      ))}
    </div>
  );
}

const AVATARS = [
  { id: "bear", label: "Bear", emoji: "🐻" },
  { id: "horse", label: "Horse", emoji: "🐴" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "dog", label: "Dog", emoji: "🐶" },
  { id: "fox", label: "Fox", emoji: "🦊" },
  { id: "panda", label: "Panda", emoji: "🐼" },
  { id: "rabbit", label: "Rabbit", emoji: "🐰" },
  { id: "tiger", label: "Tiger", emoji: "🐯" },
  { id: "lion", label: "Lion", emoji: "🦁" },
  { id: "monkey", label: "Monkey", emoji: "🐵" },
  { id: "koala", label: "Koala", emoji: "🐨" },
  { id: "penguin", label: "Penguin", emoji: "🐧" },
  { id: "frog", label: "Frog", emoji: "🐸" },
  { id: "owl", label: "Owl", emoji: "🦉" },
  { id: "unicorn", label: "Unicorn", emoji: "🦄" },
  { id: "dragon", label: "Dragon", emoji: "🐲" },
];
