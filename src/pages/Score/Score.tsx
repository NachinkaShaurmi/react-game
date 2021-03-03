import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { MainMenuButton } from "../../component/ButtonMainMenu";

const useStyles = makeStyles({
  table: {
    minWidth: 450,
    maxWidth: 900,
  },
});

type scoreProps = {
  score: (number | string)[][];
};

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
// ) {
//   return { name, calories, fat };
// }

function Score({ score }: scoreProps) {
  const classes = useStyles();
  return (
    <div className="score-container">
      <h2>Score</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Level</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Steps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {score.map((row, i) => (
              <TableRow key={row[0] + `${Date.now()}${i}`}>
                <TableCell component="th" scope="row">
                  {row[0] === -1
                    ? "empty"
                    : row[0] === 0
                    ? "Easy"
                    : row[0] === 1
                    ? "Medium"
                    : row[0] === 2
                    ? "Hard"
                    : row[0] === 3
                    ? "Maximum"
                    : "Impossible"}
                </TableCell>
                <TableCell>{row[1] === "" ? "empty" : row[1]}</TableCell>
                <TableCell>{row[2] === 999999 ? "empty" : row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MainMenuButton />
    </div>
  );
}

export default Score;
