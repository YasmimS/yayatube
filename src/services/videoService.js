import { createClient } from "@supabase/supabase-js";
import { geraTimeline } from "../../pages";

const PROJECT_URL = "https://xbjuliuissjcmvcuiuzy.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhianVsaXVpc3NqY212Y3VpdXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzOTQwMjcsImV4cCI6MTk4Mzk3MDAyN30.mGLFS00J2tK9p3rtJFOiMth40xNrUhM_gpY_0-SwgH4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService({ playlists, setPlaylists }) {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        },
        refresh() {
            supabase
              .channel("*")
              .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
                geraTimeline(this, setPlaylists);
              })
              .subscribe();
          },
    };
}