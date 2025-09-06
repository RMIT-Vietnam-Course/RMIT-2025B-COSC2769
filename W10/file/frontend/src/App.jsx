import { useState, useEffect, useRef } from "react";

const API = "http://localhost:3000";

export default function App() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState(null);
  const formRef = useRef(null);

  // Load current avatar.
  const loadAvatar = async () => {
    const res = await fetch(`${API}/avatar`);
    const data = await res.json();

    if (data?.avatar)
      setAvatarUrl(`${API}${data.avatar}`);
    else
      setAvatarUrl("");
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
  };

  const upload = async (e) => {
    e.preventDefault();

    if (!file) return;

    const fd = new FormData();
    fd.append("avatar", file);

    const res = await fetch(`${API}/avatar`, { method: "POST", body: fd });

    loadAvatar();
    setFile(null);
    formRef.current.reset();
  };

  return (
    <div className="container text-center">
      <h1>Set Avatar</h1>

      <div className="mt-3">
        {avatarUrl
          ? <img src={avatarUrl} alt="avatar" className="avatar" />
          : <em>No avatar.</em>}
      </div>

      <form ref={formRef} onSubmit={upload}>
        <div className="mt-3">
          <input type="file" className="form-control" accept="image/*" onChange={onFileChange} required />
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-success" disabled={!file}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}