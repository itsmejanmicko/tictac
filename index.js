
        const board = document.getElementById("main_board");
        const playerTurn = document.getElementById("player_turn");
        const error = document.getElementById("error");
        const resetButton = document.getElementById("reset");

        let currentPlayer = "X";
        let gameActive = true;
        let moves = Array(9).fill(null);

        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  
            [0, 4, 8], [2, 4, 6]             
        ];

        function checkGameStatus() {
            let winner = null;
            winPatterns.forEach(pattern => {
                const [a, b, c] = pattern;
                if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
                    winner = moves[a];
                    [a, b, c].forEach(index => board.children[index].classList.add("highlight-red"));
                }
            });
        
            if (winner) {
                playerTurn.textContent = `Player ${winner} wins!`;
                gameActive = false;
                setTimeout(()=>{
                     window.location.href = "https://www.youtube.com/watch?v=qxaqMVlifeA"
            },500)
            } else if (!moves.includes(null)) {
                playerTurn.textContent = "It's a tie!";
                gameActive = false;
                Array.from(board.children).forEach(cell => cell.classList.add("highlight-red"));
            }
        }
        
        

        board.addEventListener("click", (event) => {
            if (!gameActive) return;
            const cell = event.target;
            const cellIndex = Array.from(board.children).indexOf(cell);
            if (cell.classList.contains("cell") && !moves[cellIndex]) {
                moves[cellIndex] = currentPlayer;
                cell.textContent = currentPlayer;
                checkGameStatus();
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (gameActive) {
                    playerTurn.textContent = `Player ${currentPlayer}'s turn`;
                }
            } else if (cell.textContent) {
                error.textContent = "This cell is already taken. Choose another one.";
                setTimeout(() => {
                    error.textContent = "";
                }, 2000);
            }
        });

        resetButton.addEventListener("click", () => {
            moves = Array(9).fill(null);
            Array.from(board.children).forEach(cell => {
                cell.textContent = "";
                cell.classList.remove("highlight-red");
            });
            currentPlayer = "X";
            gameActive = true;
            playerTurn.textContent = "Player X's turn";
            error.textContent = "";
            
        });
