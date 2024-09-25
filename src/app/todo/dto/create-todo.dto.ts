import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty({ message: "Task não pode ser vazia" })
    @ApiProperty()
    task: string;

    @IsNotEmpty({ message: "isDone não pode ser vazio" })
    @IsIn([0, 1], { message: "isDone deve ser 0 ou 1" })
    @ApiPropertyOptional()
    isDone: number;
}