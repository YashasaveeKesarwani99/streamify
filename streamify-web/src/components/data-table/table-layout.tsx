import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import debounce from "lodash.debounce";
import { sx } from "../../utils/constants";
import SearchIcon from "@mui/icons-material/Search";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const columns = [
  { id: "songName", label: "Song Name" },
  { id: "artist", label: "Artist" },
  { id: "dateStreamed", label: "Date Streamed" },
  { id: "streamCount", label: "Stream Count" },
  { id: "userId", label: "User Id" },
];

// Styled components

// styling table container
const StyledTableContainer = styled(TableContainer)({
  borderRadius: "16px",
  border: "1.5px solid #9EABB8",
});

// styling table cell
const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: "1px solid #9EABB8",
  borderLeft: "none", // Remove vertical border on the left
  borderRight: "none", // Remove vertical border on the right
}));

// styling table head
const StyledTableHead = styled(TableHead)({
  backgroundColor: "#243647",
});

// styling table body
const StyledTableBody = styled(TableBody)({
  backgroundColor: "transparent",
});

// declaring table layout props
export interface TableLayoutProps {
  rows: TableDataResponse[] | undefined;
}

const TableLayout: React.FC<TableLayoutProps> = ({ rows }) => {
  //states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [orderBy, setOrderBy] = useState<"asc" | "des">("des");
  const [order, setOrder] = useState<"dateStreamed" | "streamCount" | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  // debouncing search function ( filterData function )
  const debounceFilterData = React.useMemo(
    () =>
      debounce((query: string) => {
        const filtered = filterData(rows, query);
        setFilteredData(filtered);
      }, 300),
    [rows]
  );

  // function that filters data from the original rows
  const filterData = (
    data: TableDataResponse[] | undefined,
    query: string
  ): TableDataResponse[] | undefined => {
    if (!query) return data;
    return data?.filter(
      (row) =>
        row.songName.toLowerCase().includes(query.toLowerCase()) ||
        row.artist.toLowerCase().includes(query.toLowerCase())
    );
  };

  // defining an extra state for filtered data
  const [filteredData, setFilteredData] = useState<
    TableDataResponse[] | undefined
  >(filterData(rows, searchQuery));

  // handling query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debounceFilterData(query);
  };

  // handling sort order and property change
  const handleSort = (property: "dateStreamed" | "streamCount" | null) => {
    if (property !== order) {
      setOrder(null);
      setOrderBy("des");
    }
    setOrder(property);
    setOrderBy((orderBy) => (orderBy === "asc" ? "des" : "asc"));
  };

  // getting sorted data ( both filetered and sorted )
  const sortedData: TableDataResponse[] | undefined = React.useMemo(() => {
    let dataToSort = filteredData || [];
    if (!order) return [...dataToSort];
    if (order === "streamCount") {
      return [...dataToSort].sort((a, b) => {
        if (orderBy === "asc") {
          return a[order] < b[order] ? -1 : 1;
        } else {
          return a[order] > b[order] ? -1 : 1;
        }
      });
    } else {
      if (orderBy === "des") {
        return [...dataToSort];
      } else {
        return [...dataToSort].slice().reverse();
      }
    }
  }, [order, orderBy, filteredData]);

  // handling page change event
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // handling change of rows with page change event
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // final paginated data after pagination and filter and sorting
  const paginatedData: TableDataResponse[] | undefined = React.useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedData?.slice(startIndex, startIndex + rowsPerPage);
  }, [page, rowsPerPage, sortedData, order, orderBy, filteredData]);

  return (
    <div>
      <TextField
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
        className="!mt-8 w-full sm:w-1/2"
        sx={sx}
      />
      <StyledTableContainer
        className={`mt-4 ${!paginatedData.length && "min-h-[380px]"}`}
      >
        <Table className="rounded-lg">
          <StyledTableHead>
            <TableRow>
              {columns.map((column) => {
                if (column.id === "dateStreamed") {
                  return (
                    <StyledTableCell
                      className="!text-white !font-bold"
                      key={column.id}
                    >
                      Date Streamed
                      <span
                        onClick={() => handleSort("dateStreamed")}
                        className="cursor-pointer !text-white !font-bold"
                      >
                        {order === "dateStreamed" && orderBy === "asc" ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </span>
                    </StyledTableCell>
                  );
                } else if (column.id === "streamCount") {
                  return (
                    <StyledTableCell
                      className="!text-white !font-bold"
                      key={column.id}
                    >
                      Stream Count
                      <span
                        onClick={() => handleSort("streamCount")}
                        className="cursor-pointer !text-white !font-bold"
                      >
                        {order === "streamCount" && orderBy === "asc" ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </span>
                    </StyledTableCell>
                  );
                } else {
                  return (
                    <StyledTableCell
                      key={column.id}
                      className="!text-white !font-bold"
                    >
                      {column.label}
                    </StyledTableCell>
                  );
                }
              })}
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>
            {paginatedData?.map((row) => (
              <TableRow key={row.userId}>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    className="bg-primary !text-[#9EABB8]"
                  >
                    {row[column.id as keyof TableDataResponse]}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </StyledTableBody>
        </Table>
      </StyledTableContainer>
      <TablePagination
        className="bg-primary !text-white !shadow-transparent"
        rowsPerPageOptions={[6]}
        component="div"
        count={sortedData?.length ? sortedData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableLayout;
