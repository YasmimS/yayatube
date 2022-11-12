import React from "react";
import Link from "next/link";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledHeader } from "../src/components/Header";
import { StyledFavorites } from "../src/components/Favorite";
import Footer from "../src/components/Footer";

function HomePage() {
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro}  playlists={config.playlists} />
                <Favorite favorites={config.favorites} />
                <Footer/>
            </div>
        </>
    );
  }
  
  export default HomePage

  const StyledBanner =styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    background-position: center center;
    height:230px;
  `;

  function Header(){
    return (
     <StyledHeader>
        <StyledBanner bg={config.bg} />
        <section className="user-info">
        <a href="https://github.com/YasmimS"> <img className="profile" src={`https://github.com/${config.github}.png`}  alt="profile picture"/></a>
            <div>
                <h2>
                    {config.name}
                </h2>
                <p>
                    {config.description}
                </p>
            </div>
         </section>
      </StyledHeader>
    )
  }

  function Timeline( {searchValue, ...props}) {
    // console.log("Dentro do componente", propriedades.playlists);
    const playlistNames = Object.keys(props.playlists);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                let countVideos = 0;
                /*console.log(playlistName);
                console.log(videos);*/
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                        {videos
                            .filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                countVideos = countVideos + 1;
                                let video_id;
                                const regExp =
                                /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                const match = video.url.match(regExp);
                                if (match && match[2].length == 11) {
                                    video_id = match[2];
                                }
                                return (
                                <Link
                                    href={{
                                    pathname: "/video",
                                    query: {
                                        id: video_id,
                                        title: video.title,
                                    },
                                }}
                                    key={video.url}
                                >
                                    <img src={video.thumb} />
                                    <span>{video.title}</span>
                                </Link>
                                )
                            })}
                            {countVideos === 0 ? "Nenhum Vídeo Encontrado!" : ""}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function Favorite (props) {
    const favoriteNames = Object.keys(props.favorites)
    return(
    <StyledFavorites>
        {favoriteNames.map((favoriteName) => {
            const videos = props.favorites[favoriteName];
            return (
                <section key={favoriteName}>
                    <h2>
                        {favoriteName}
                    </h2>
                    <div>
                    {videos.map((video)=>{
                        return(
                                <a key={video.url} href={video.url}>
                                <img src={video.thumb}/>
                                <span>{video.title}</span>
                            </a>
                            )
                        }
                    )}
                    </div>
                </section>
            )
        })}
    </StyledFavorites>
    )
  }