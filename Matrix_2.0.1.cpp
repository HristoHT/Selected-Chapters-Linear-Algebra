#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

class Matrix
{
public:
    int grid[27];
    assignGrid()
    {
        for(int i = 0; i < 27; i ++)
        {
            grid[i] = i;
        }
    }

    assignGrid(char *encoding)
    {
        int len = strlen(encoding);
        int used[27];
        memset(used, 0, sizeof used);

        for(int i = 0; i < len; i ++)
        {
            int character =  (int)(*(encoding + i) - 'a');
            if(*(encoding + i) == ' ')
                character = 26;
            grid[i] = character;
            used[character] = 1;
        }

        int currentLetter = 0;
        for(int i = len; i < 27; i ++)
        {
            while(used[currentLetter])
            {
                currentLetter++;
            }
            used[currentLetter] = 1;
            grid[i] = currentLetter;
        }
    }

    assignGrid(int *newGrid)//newGrid must be array with length 26!!
    {
        for(int i = 0; i < 27; i ++)
        {
            grid[i] = newGrid[i];
        }
    }

    print()
    {
        for(int i = 0; i < 27; i ++)
        {
            for(int j = 0; j < 27; j ++)
            {
                if(j == grid[i])
                    cout << "1 ";
                else
                    cout << "0 ";
            }
            cout << endl;
        }
    }

    reverseMatrix()
    {
        int newGrid[27];

        for(int i = 0; i < 27; i ++){
                cout << i << "-" << grid[i] << " --> " << grid[i] << "-" << i << endl;
            newGrid[grid[i]] = i;
        }

        assignGrid(newGrid);
    }

    Matrix()
    {
        cout << "First\n";
        assignGrid();
    }

    Matrix(char *encoding)
    {
        cout << "Second\n";
        assignGrid(encoding);
    }

    Matrix operator = (Matrix other)
    {
        assignGrid(other.grid);
        return *this;
    }

    Matrix operator * (Matrix other)
    {
        int newGrid[27];

        for(int i = 0; i < 27; i ++)
        {
            newGrid[grid[i]] = other.grid[i];
        }

        assignGrid(newGrid);

        return *this;
    }

    Matrix operator ^ (int power)
    {
        if(power == 1)
            return *this;
        else if(power == 0)
        {
            assignGrid();
            return *this;
        }
        else if(power == -1)
        {

        }
    }
};

int main()
{
    Matrix a;
    char encoding[27];
    strcpy(encoding, "z");
    Matrix b(encoding);

    a = b;
    b.reverseMatrix();
    b = b * a;
    b.print();
}
// ejvsordtcqwuxnbgmahkizpfyl
