import { supabase } from "./supabaseClient";
// Fetch scores
export const fetchScores = async (sessionId: string) => {
  const { data, error } = await supabase
    .from("single_player_scores")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false })
    .limit(1); // Get the most recent record
  if (error) {
    console.error("Error fetching scores:", error);
  }
  return data?.[0] || null;
};

// Update scores
export const updateScores = async (
  sessionId: string,
  playerSymbol: string,
  result: string
) => {
  const existingScores = await fetchScores(sessionId);
  const playerWins = existingScores?.player_score || 0;
  const aiWins = existingScores?.ai_score || 0;
  const aiSymbol = playerSymbol === "X" ? "O" : "X";

  const updatedScores = {
    session_id: sessionId,
    player_symbol: playerSymbol,
    player_score: result === playerSymbol ? playerWins + 1 : playerWins,
    ai_score: result === aiSymbol ? aiWins + 1 : aiWins,
    winner: result,
  };
  const { error } = await supabase
    .from("single_player_scores")
    .insert([updatedScores]);

  if (error) {
    console.error("Error updating scores:", error);
  }
};