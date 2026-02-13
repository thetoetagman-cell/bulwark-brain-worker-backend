export default {
  async fetch(request) {
    try {
      if (request.method !== "POST") {
        return new Response(
          JSON.stringify({ error: "Only POST requests are allowed." }),
          { status: 405, headers: { "Content-Type": "application/json" } }
        );
      }

      const body = await request.json();
      const { modifiers, map, tiles } = body;

      if (!modifiers || !Array.isArray(modifiers)) {
        return new Response(
          JSON.stringify({ error: "Missing or invalid modifiers array." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const recommendedTeam = [
        "Stone Hoof XB-6",
        "Anesthesia XL-61",
        "Muqam M25",
        "Acute Field G14",
        "Magnetized Clay A20"
      ];

      return new Response(
        JSON.stringify({
          status: "ok",
          team: recommendedTeam,
          receivedModifiers: modifiers,
          receivedMap: map || null,
          receivedTiles: tiles || null
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Server error", details: err.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
};
