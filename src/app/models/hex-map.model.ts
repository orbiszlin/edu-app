export interface HexMapModel {
  id: string;
  tileCount: number;
  columnsCount: number;
  rowsCount: number;
  columns: Column[];
}

interface Column {
  rows: Row[];
}

interface Row {
  tile: Tile;
}

interface Tile {
  id: string;
  ownerId: string;
  typeId: string;
}
