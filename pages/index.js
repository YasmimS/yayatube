import React from "react";
import Link from "next/link";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledHeader } from "../src/components/Header";
import { StyledFavorites } from "../src/components/Favorite";
import Footer from "../src/components/Footer";
import getIdFromURL from "../src/utils/getIdFromURL";
import { videoService } from "../src/services/videoService";

export const possiblePlaylists = ["Upload dos Usuário", "jogos", "filmes", "front-end", "back-end"];

function HomePage() {
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});   // config.playlists
    const service = videoService({playlists, setPlaylists});

    React.useEffect(() => {
       geraTimeline(service, setPlaylists); 
       service.refresh();
    }, []);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro}  playlists={{ ...playlists, ...config.playlists }} />
                <Favorite favorites={config.favorites} />
                <Footer/>
            </div>
        </>
    );
  }
  
  export default HomePage

  export function geraTimeline(service, setPlaylists){
    console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {};
                dados.data?.forEach((video) => {
                    if (!novasPlaylists[video.playlist] && possiblePlaylists.includes(video.playlist)){
                    novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                   }
                   else if (!novasPlaylists[video.playlist] && novasPlaylists["Upload dos Usuário"]) {
                    novasPlaylists["Upload dos Usuário"] = [
                      video,
                      ...(novasPlaylists["Upload dos Usuário"]),
                    ];
                  } else if (novasPlaylists[video.playlist]) {
                    novasPlaylists[video.playlist] = [
                      video,
                      ...(novasPlaylists[video.playlist]),
                    ];
                  }
                });

                setPlaylists(novasPlaylists);
            });
   }

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
                    <section key={videos[0].url}>
                        <h2>{playlistName}</h2>
                        <div>
                        {videos
                            .filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                countVideos = countVideos + 1;
                                return (
                                <Link
                                    href={{
                                    pathname: "/video",
                                    query: {
                                        id: getIdFromURL(video.url),
                                        title: video.title,
                                        playlist: possiblePlaylists.includes(video.playlist)
                                        ? video.playlist
                                        : "Upload dos Usuário",
                                    },
                                }}
                                    key={video.url + video.title}
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
                <section key={favoriteName} className="wrapper-favorites">
                  <h2>{favoriteName}</h2>
                    <div className="favorite-info">
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