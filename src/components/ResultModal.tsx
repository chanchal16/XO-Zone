import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  resetGame,
  restartGame,
} from "@/lib/features/single-player/singlePlayerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "./ui/button";

const ResultModal = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { winner, isDraw, playerSymbol, aiSymbol } = singlePlayerState;
  const dispatch = useAppDispatch();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (winner) {
      const timeout = setTimeout(() => {
        setShowDialog(true);
      }, 2000); // Delay of 2 seconds for better ux

      // Cleanup timeout
      return () => clearTimeout(timeout);
    } else {
      setShowDialog(false); // Close the dialog if there's no winner
    }
  }, [winner]);

  const handleQuit = () => {
    dispatch(resetGame());
    setShowDialog(false);
  };

  const handleRestart = () => {
    dispatch(restartGame());
    setShowDialog(false);
  };
  return (
    <Dialog open={showDialog}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="text-center text-white border-none bg-minimal-playerO-200">
        <DialogHeader>
          <DialogTitle className="text-minimal-playerO-200">
            Results
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          {winner === playerSymbol ? (
            <>
              <h3 className="text-2xl font-semibold">Congratualations!!</h3>
              <p className="text-xl mt-2 text-white">You won the match</p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold">oh!.. You Loose</h3>
              <p className="text-xl mt-2 text-white">Better luck next time</p>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            variant={"default"}
            className=" text-minimal-gridLines font-semibold bg-minimal-accentC"
            onClick={handleRestart}
          >
            Restart
          </Button>
          <Button
            variant={"destructive"}
            className="bg-white border-2 border-minimal-playerO-200 text-minimal-playerO-200 hover:text-white hover:bg-minimal-playerO-200"
            onClick={handleQuit}
          >
            Quit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;