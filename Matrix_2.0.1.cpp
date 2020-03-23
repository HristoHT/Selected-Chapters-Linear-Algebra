#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

class Matrix
{
private:
    char *_encoding;
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

    print(){
        for(int i = 0; i < 27; i ++){
            for(int j = 0; j < 27; j ++){
                if(j == grid[i])cout << "1 ";
                else cout << "0 ";
            }
            cout << endl;
        }
    }

    Matrix()
    {
        cout << "First\n";
        assignGrid();
    }

    Matrix(char *encoding): _encoding(encoding)
    {
        cout << "Second\n";
        assignGrid(_encoding);
    }
};

int main()
{
    Matrix a;
    char encoding[27];
    strcpy(encoding, " ejvsordtcqwuxnbgmahkizpfyl");
    Matrix b(encoding);
    a.print();
    cout << "-------------------------------\n";
    b.print();
}
