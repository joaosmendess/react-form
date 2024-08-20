import { useState } from 'react';
import "./styles/global.css";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from './lib/supabase';
import { Form } from './components/Form';
import { TechFieldArray } from './components/Form/TechFieldArray';

const createUserFormSchema = z.object({
  avatar: z.instanceof(FileList)
    .transform(list => list.item(0))
    .refine(file => file!.size <= 5 * 1024 * 1024, 'O arquivo precisa ter no máximo 5Mb'),
   
  name: z.string()
    .min(1, 'O nome é obrigatório')
    .transform(name => name.trim().split(' ').map(word => word[0].toLocaleUpperCase().concat(word.substring(1))).join(' ')),

  email: z.string()
    .email('Formato de e-mail inválido')
    .min(1, "O e-mail é obrigatório")
    .toLowerCase()
    .refine(email => email.endsWith('@teste.com'), 'O e-mail precisa ser do domínio @teste.com'),

  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),

  techs: z.array(z.object({
    title: z.string().min(1, 'O título é obrigatório'),
    knowledge: z.coerce.number().min(1).max(100),
  })).min(2, 'Insira pelo menos 2 tecnologias')
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

function App() {
  const methods = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const [output, setOutput] = useState("");

  async function createUser(data: CreateUserFormData) {
    await supabase.storage.from('forms-react').upload(data.avatar!.name, data.avatar!);
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className="h-screen bg-zinc-50 flex items-center flex-col gap-10 justify-center">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(createUser)} className="flex flex-col gap-4 w-full max-w-xs">
          
          <Form.Field>
            <Form.Label htmlFor="avatar">Avatar</Form.Label>
            <Form.Input name="avatar" type="file" accept="image/*" />
            <Form.ErrorMessage field="avatar" />
          </Form.Field>
          
          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Input name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.Input name="email" type="email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.Input name="password" type="password" />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          <TechFieldArray />

          <button type="submit" className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600">
            Salvar
          </button>
        </form>
      </FormProvider>
      <pre>{output}</pre>
    </main>
  );
}

export default App;
