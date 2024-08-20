import { useFieldArray, useFormContext } from 'react-hook-form';
import { Form } from './index';

type Tech = {
  title: string;
  knowledge: number;
};

type FormData = {
  techs: Tech[];
};

export function TechFieldArray() {
  const { control, formState: { errors } } = useFormContext<FormData>();
  const { fields, append } = useFieldArray({
    control,
    name: 'techs',
  });

  function addNewTech() {
    append({ title: '', knowledge: 0 });
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <Form.Label htmlFor="techs">Tecnologias</Form.Label>
        <button type="button" className="text-emerald-500 text-sm" onClick={addNewTech}>Adicionar</button>
      </div>
      {fields.map((field, index) => (
        <div className="flex gap-2" key={field.id}>
          <Form.Field>
            <Form.Label htmlFor={`techs.${index}.title`}>Título</Form.Label>
            <Form.Input name={`techs.${index}.title`} placeholder="Título da tecnologia" />
            <Form.ErrorMessage field={`techs.${index}.title`} />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor={`techs.${index}.knowledge`}>Conhecimento</Form.Label>
            <Form.Input name={`techs.${index}.knowledge`} type="number" placeholder="Conhecimento" />
            <Form.ErrorMessage field={`techs.${index}.knowledge`} />
          </Form.Field>
        </div>
      ))}
      {errors.techs && <Form.ErrorMessage field="techs" />}
    </div>
  );
}
