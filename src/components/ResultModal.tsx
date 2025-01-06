import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  resetGame,
  restartGame,
} from "@/lib/features/single-player/singlePlayerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ResultModal = () => {
  const singlePlayerState = useAppSelector((state) => state.singleMode);
  const { winner, isDraw, playerSymbol, aiSymbol } = singlePlayerState;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (winner || isDraw) {
      const timeout = setTimeout(() => {
        setShowDialog(true);
      }, 1500); // Delay of 2 seconds for better ux
      // Cleanup timeout
      return () => clearTimeout(timeout);
    } else {
      setShowDialog(false); // Close the dialog if there's no winner
    }
  }, [winner, isDraw]);

  const handleQuit = () => {
    dispatch(resetGame());
    setShowDialog(false);
    router.push("/");
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
          <DialogDescription className="text-minimal-playerO-200">
            {" "}
            about scores
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          {winner === playerSymbol && (
            <>
              <Image
                src={"/winner.svg"}
                alt="winner"
                width={128}
                height={128}
              />
              <h3 className="text-2xl font-semibold">Congratualations!!</h3>
              <p className="text-xl mt-2 text-white">You won the match</p>
            </>
          )}
          {winner === aiSymbol && (
            <>
              <Image
                src={"/sad-face.svg"}
                alt="winner"
                width={120}
                height={120}
              />
              <h3 className="text-2xl font-semibold">oh!.. You Loose!</h3>
              <p className="text-xl mt-2 text-white">Better luck next time</p>
            </>
          )}
          {isDraw && (
            <>
              <Image
                src={"/collaborate.svg"}
                alt="winner"
                width={120}
                height={120}
              />
              <h3 className="text-2xl font-semibold">It's a draw!</h3>
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
            variant={"default"}
            className="bg-white border-2 border-minimal-playerO-200 text-minimal-playerO-200 hover:text-white "
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