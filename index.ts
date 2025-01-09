/* definir uma interface Equipa para representar uma equipa */ 
interface Equipa {
  nome: string,
  titulos: string | string[];
}
/* definir uma EquipasComID interface que representa uma equpa mas que tenha uma propriedade 
id */
interface EquipasComID extends Equipa {
  id: number,
  nome: string,
  titulos: string | string[];
}

// Importar equipas
import equipas from "./equipas.json";

/* FAzendo usando de overloading de funçºoes implementar uma função procuraEquipa */ 

/* A função deve sempre retornar um array de EquipasComID */ 
/* A função deve receber como parâmetro:

1 - String equipas lida do ficheiro json OU 
2 - String equipas e uma função filtro para filtrar o array a retornar OU
4 - Um array de objectos equipa OU
3 - Um array de objectos equipa e  e uma função filtro para filtrar o array a retornar
4 - 
*/
function procuraEquipa(equipas: string): EquipasComID[];
function procuraEquipa(equipas: string, filtro: (Equipa: Equipa) => boolean): EquipasComID[];

function procuraEquipa(equipas: Equipa[]): EquipasComID[];

function procuraEquipa(equipas: Equipa[], filtro: (Equipa: Equipa) => boolean): EquipasComID[];


function procuraEquipa(
  entrada: Equipa[] | string,
  filtro?: (equipa: Equipa) => boolean
): EquipasComID[]{
  const equipas: Equipa[] = typeof entrada === "string" ? JSON.parse(entrada) : entrada;

  const equipa2 = ( filtro? equipas.filter(filtro) : equipas) 
  return equipa2.map((equipa)=>({
    id: equipas.indexOf(equipa),
    ...equipa
  }))
}

// Exemplos de chamadas à função


console.log(procuraEquipa(equipas, ( {nome}) => nome === "LEIT"));

console.log(
  procuraEquipa(JSON.stringify(equipas), ({ titulos }) =>
    Array.isArray(titulos) && titulos.includes("2023")
  )
);

console.log(procuraEquipa(equipas, ({ nome }) => nome === "PILOTAGEM"));