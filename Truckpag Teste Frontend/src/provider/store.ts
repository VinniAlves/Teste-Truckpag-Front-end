import { configureStore, createSlice } from '@reduxjs/toolkit';



const anotacaoSlice = createSlice({
  name: 'anotacoes',
  initialState: [] as Array<{id: string, anotacao:string}>,
  reducers: {
    setAnotacao: (state, action) => {

      const { id, anotacao } = action.payload;

      const index = state.findIndex(filme => filme.id === id);
      
      if (index !== -1) {
        state[index].anotacao = anotacao;
      } else {
        state.push({ id, anotacao });
      }
    },
  },
});

export const { setAnotacao } = anotacaoSlice.actions;

export const store = configureStore({
  reducer: {
    anotacoes: anotacaoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;