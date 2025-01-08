/* definir uma interface Equipa para representar uma equipa */ 
interface Equipa {
  nome: string;
  titulos: string | string[];
}
/* definir uma EquipasComID interface que representa uma equpa mas que tenha uma propriedade 
id */
interface EquipasComID extends Equipa {
  id: number;
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
function procuraEquipa(
  input: string | Equipa[],
  filtro?: (equipa: EquipasComID) => boolean
): EquipasComID[] {
  let equipasComID: EquipasComID[];

  // Verificar se a entrada é uma string (JSON)
  if (typeof input === "string") {
    const equipasArray: Equipa[] = JSON.parse(input);
    equipasComID = equipasArray.map((equipa, index) => ({ ...equipa, id: index }));
  } else {
    equipasComID = input.map((equipa, index) => ({ ...equipa, id: index }));
  }

  // Aplicar o filtro, se fornecido
  if (filtro) {
    return equipasComID.filter(filtro);
  }

  return equipasComID;
}

// Exemplos de chamadas à função
console.log(
  procuraEquipa(JSON.stringify(equipas), ( {nome} ) => nome === "2023")
);

console.log(procuraEquipa(equipas, ( {nome}) => nome === "LEIT"));

console.log(
  procuraEquipa(JSON.stringify(equipas), ({ titulos }) =>
    Array.isArray(titulos) && titulos.includes("2023")
  )
);

console.log(procuraEquipa(equipas, ({ nome }) => nome === "PILOTAGEM"));