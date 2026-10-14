export default async (request) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=60"
  };

  try {
    const url = new URL(request.url);
    const avatarUserId = url.searchParams.get("avatarUserId");

    if (avatarUserId) {
      if (!/^\d+$/.test(avatarUserId)) {
        return new Response(JSON.stringify({ error: "Invalid user ID" }), { status: 400, headers });
      }
      const response = await fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${encodeURIComponent(avatarUserId)}&size=420x420&format=Png&isCircular=false`
      );
      if (!response.ok) {
        return new Response(JSON.stringify({ error: "Roblox avatar service unavailable", upstreamStatus: response.status }), { status: 502, headers });
      }
      return new Response(await response.text(), { status: 200, headers });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Send a POST with a username, or use avatarUserId for an avatar." }), { status: 405, headers });
    }

    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim() : "";
    if (!username || username.length > 20 || !/^[A-Za-z0-9_]+$/.test(username)) {
      return new Response(JSON.stringify({ error: "Enter a valid Roblox username." }), { status: 400, headers });
    }

    const response = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
    });
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Roblox user service unavailable", upstreamStatus: response.status }), { status: 502, headers });
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200, headers });
  } catch {
    return new Response(JSON.stringify({ error: "Lookup failed. Please try again later." }), { status: 500, headers });
  }
};
