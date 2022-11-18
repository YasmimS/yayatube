import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";
import getIdFromURL from "../../utils/getIdFromURL";

// Whiteboarding
// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({
                titulo: "",
                url: "",
            });
        }
    };
}

const PROJECT_URL = "https://xbjuliuissjcmvcuiuzy.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhianVsaXVpc3NqY212Y3VpdXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzOTQwMjcsImV4cCI6MTk4Mzk3MDAyN30.mGLFS00J2tK9p3rtJFOiMth40xNrUhM_gpY_0-SwgH4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "", url: ""}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);     
    //console.log();        
    /*
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
        - titulo
        - url do vídeo 
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
    */

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => {setFormVisivel(true); formCadastro.clearForm();}}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ? (
                    <form onSubmit={async (evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);

                        //Contrato entre o FrontEnd e BackEnd
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: `https://img.youtube.com/vi/${getIdFromURL(
                                formCadastro.values.url
                            )}/hqdefault.jpg`,
                            playlist: "Upload dos Usuário",
                        })
                        .then((retorno) => {
                            console.log(retorno);
                        })
                        .catch((err) => {
                            console.log(err);
                            alert(`${err}`);
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                          <fieldset>
                           <legend id="legend">Enviar vídeo</legend>
                            <input
                                placeholder="Titulo do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange} 
                                minLength="5"
                                max="50" required
                            />
                            <input
                                pattern="((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-_]{11})(\S+)?"
                                title="Uma URL válida contém determinada estrutura e um id com 11 caracteres"
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange} required
                            />
                         </fieldset>
                            <button type="submit">
                                Cadastrar
                            </button><br/>

                            {getIdFromURL(formCadastro.values.url)?.length === 11 && (
                            <img
                                alt=""
                                src={`https://img.youtube.com/vi/${getIdFromURL(
                                formCadastro.values.url
                                )}/hqdefault.jpg`}
                            />
                            )}
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}


// [X] Falta o botão para adicionar
// [X] Modal
// -> [X] Precisamos controlar o state
// -> Formulário em si