#include<iostream>
#include<cstring>
#include<vector>

using namespace std;

class Matrix
{
public:
    int grid[27][27];
    char *_alphabet;
    void assignAlphabetToGrid(char *alphabet, size_t size)
    {
        int used[27];
        memset(used, 0, sizeof used);
        memset(this->grid, 0, sizeof grid);

        for(int i = 0; i < size; i ++)
        {
            int pos = (int)(alphabet[i] - 'a');
            if(alphabet[i] == ' ')
                pos = 26;
            this->grid[i][pos] = 1;
            used[pos] = 1;
        }
        int currentLetter = 0;
        for(int i = size; i < 27; i ++)
        {
            while(used[currentLetter])
            {
                currentLetter++;
            }
            used[currentLetter] = 1;
            this->grid[i][currentLetter] = 1;
        }
    }

    int shiftMatrix()
    {
        int newGrid[27][27];

        for(int i = 0; i < 27; i ++)
        {
            for(int j = 0; j < 27; j ++)
            {
                newGrid[i == 0? 26: i - 1][j] = this->grid[i][j];
            }
        }

        assignMatrix(newGrid);
    }

    void reverseMatrix()
    {
        vector<int> orderOfTheRows;
        for(int i = 0; i < 27; i ++)
        {
            for(int j = 0; j < 27; j ++)
            {
                if(this->grid[j][i] == 1)
                {
                    orderOfTheRows.push_back(j);
                    break;
                }
            }
        }

        int reverseGrid[27][27];
        for(int i = 0; i < 27; i ++)
        {
            for(int j = 0; j < 27; j ++)
            {
                reverseGrid[i][j] = orderOfTheRows[i] == j ? 1 : 0;
            }
        }

        assignMatrix(reverseGrid);
    }


    void transposeMatrix()
    {
        int newGrid[27][27];
        for(int i = 0; i < 27; i ++)
        {
            for(int j = 0; j < 27; j ++)
            {
                newGrid[j][i] = this->grid[i][j];
            }
        }

        assignMatrix(newGrid);
    }

    void assignMatrix(int newGrid[27][27])
    {
        for(int i = 0; i < 27; i ++)
        {
            for(int j = 0; j < 27; j ++)
            {
                this->grid[i][j] = newGrid[i][j];
            }
        }
    }

    void print()
    {
        for(int i = 0; i < 27; i ++)
        {
            for(int j = 0; j < 27; j ++)
            {
                cout << this->grid[i][j] << " ";
            }
            cout << endl;
        }
    }

    Matrix()
    {
        cout << "One\n";
        _alphabet = NULL;
        assignAlphabetToGrid(_alphabet, 0);
    }

    Matrix(char *str): _alphabet(str)
    {
        cout << "Two\n";
        assignAlphabetToGrid(_alphabet, strlen(_alphabet));
    }

    Matrix operator = (Matrix other)
    {
        assignMatrix(other.grid);
        return *this;
    }
    Matrix operator * (Matrix other)
    {
        int newMatrix[27][27];
        for(int i = 0; i < 27; i ++)
        {
            for(int j = 0; j < 27; j ++)
            {
                int currentVal = 0;
                for(int r = 0; r < 27; r ++)
                {
                    currentVal += this->grid[i][r] * other.grid[r][j];
                }
                newMatrix[i][j] = currentVal;
            }
        }
        assignMatrix(newMatrix);
        return *this;
    }

    Matrix operator ^ (int pow)
    {
        if(pow == -1)
        {
            reverseMatrix();
        }
        else if(pow == 0)
        {
            int idGrid[27][27];
            memset(idGrid, 0, sizeof idGrid);
            for(int i = 0; i < 27; i ++)
            {
                idGrid[i][i] = 1;
            }

            assignMatrix(idGrid);
        }

        return *this;

    }

    char operator * (char ch)
    {
        int pos = (int)(ch - 'a');
        if(ch == ' ')
            pos = 26;
        for(int i = 0; i < 27; i ++)
        {
            if(this->grid[pos][i] == 1)
            {
                if(i == 26)
                    return ' ';
                else
                    return (char)(i + 'a');
            }
        }
    }
};

int main()
{
    Matrix G1, G2, G3, S, P, R;
    S.shiftMatrix();

    char sentance[256];
    cin.getline(sentance, 255);

    int len = strlen(sentance);

    cout << '"';
    for(int i = 0; i < len; i ++)
    {
        Matrix a = (G3*(S^(i/(26*26))))^(-1), b = (G2*(S^(i/26)))^(-1), c = (G1*(S^i))^(-1), d = (G3*(S^(i/(26*26)))), e = (G3*(S^(i/26))), f = (G1*(S^i));
        cout << ( R * d * e * f * P) * sentance[i];
        S.shiftMatrix();
    }
    cout << '"' << endl;
}
/* ejvsordtcqwuxnbgmahkizpfyl*/
