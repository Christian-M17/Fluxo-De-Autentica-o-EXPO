import axios from "axios";

const challongeAPI = "https://api.challonge.com/v1";
const apiKey = "Insira a chave aqui";

const api = axios.create({
    baseURL: challongeAPI,
    params: {
        api_key: apiKey,
    },
    timeout: 5000,
});

export async function listarTorneios() {
    try {

        const response = await api.get("/tournaments.json", {
            params: { state: "all" },
        });


        const torneios = response.data.map((item: any) => ({
            nome: item.tournament.name,
            criadoEm: item.tournament.started_at,
        }));

        console.log("Torneios pendentes:");
        console.table(torneios);
        return torneios;
    } catch (error: any) {
        console.error("Erro ao buscar torneios:", error.message);
        return [];
    }
}


