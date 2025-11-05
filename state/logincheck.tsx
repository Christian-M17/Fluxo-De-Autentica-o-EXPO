
export const loginCheck = async (usuario: string, senha: string): Promise<boolean> => {
   
    await new Promise(resolve => setTimeout(resolve, 1500));

    if ((usuario === 'admin' || usuario === 'user') && senha === 'admin') {
        return true;
    } else {
        return false;
    }
};
