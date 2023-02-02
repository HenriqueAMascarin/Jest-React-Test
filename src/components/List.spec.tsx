import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

describe('List Component', () => {
    it('should render list items', async () => {
        const { getByText, rerender, queryByText} = render(<List initialItems={['Diego', 'Rodz', 'Mayk']} />)

        
        rerender(<List initialItems={["Julia"]}/>) //rerender apenas faz a parte de retorno renderizar novamente, então usa-se um useEffect para trocar o valor do estado toda vez que initial items mudar.
        
        expect(getByText('Julia')).toBeInTheDocument();
        expect(queryByText('Mayk')).not.toBeInTheDocument();
        // expect(screen.queryByText('Mayk')).not.toBeInTheDocument(); metodo screen acessa globalmente o estado no documento (não foi usado nesse caso aqui, só conceito mesmo)
    });

    it('should be able to add new item to the list', async () =>{
        const { getByText, getByPlaceholderText, findByText } = render(<List initialItems={[]}/>)

        const inputElement = getByPlaceholderText('Novo item')
        const addButton = getByText('Adicionar');

        // debug() vem do render que nem o getByText, um debug que nem o browser

        await userEvent.type(inputElement, 'Novo')

        await userEvent.click(addButton);
        
        // debug()

        // 
        await waitFor(() => {
            expect(getByText('Novo')).toBeInTheDocument();
        })// pode ser passado um intervalo dentro de propriedade
        // ou
        // expect(await findByText('Novo')).toBeInTheDocument();
    });

    it('should be able to add remove item from the list', async () =>{
        const { getAllByText , queryByText } = render(<List initialItems={['Diego']}/>)

        const removeButtons = getAllByText('Remover');

        await userEvent.click(removeButtons[0]);

        // await waitForElementToBeRemoved(() =>{
        //     return getByText('Diego');
        // })
        // ou
        await waitFor(() => {
            expect(queryByText('Diego')).not.toBeInTheDocument()
        })
    });
});