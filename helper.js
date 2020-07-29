const math = require('mathjs');

let A = math.matrix([2, 3, 4, 5, 6, 1]);
let B = math.matrix([
    [2],
    [3],
    [4],
    [5]
    [6],
    [1]
])

console.log(math.multiply(A, B));

Sh = \{ a | a \in M_n(F) \land \forall c \in N \rightarrow \forall i,j(i \ne j) \in [1, ..., n]\ a_{i, j} = \begin{cases}
1, j = (i+c)\ mod\ n)\\
0, j \ne (i+c)\ mod\ n)\end{cases}}

\begin{pmatrix}
0&1&0&...&0\\
0&0&1&...&0\\
...& ...& ...& ... &...\\
1&0&0&...&0\\
\end{pmatrix}^2\ =
\begin{pmatrix}
0&0&1&...&0\\
...& ...& ...& ... &...\\
1&0&0&...&0\\
0&1&0&...&0\\
\end{pmatrix}\


Sw = \{ A\ |\ a_i_j \in A\ \land\  a_i_j = 1\ \rightarrow\ a_j_i = 1\ \land a_i_r = 0\ \land\ \\ a_r_i = 0\ \land\ a_j_r = 0\ \land\ a_r_j = 0,\ i,j,r\ \in\ [1, ..., n], (r \ne i\ \land\ r \ne j) \}

P,R \in Sw,\
C_1,C_2,C_3 \in Sc,\
S\in Sh