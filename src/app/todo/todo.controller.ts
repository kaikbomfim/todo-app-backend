import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { ShowTodoSwagger } from './swagger/show-todo-swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found.swagger';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas as tarefas' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de tarefas retornada com sucesso', type: IndexTodoSwagger, isArray: true, })
    async index() {
        return await this.todoService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Adicionar uma nova tarefa' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Nova tarefa criada com sucesso!', type: CreateTodoSwagger, })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Parâmetros inválidos', type: BadRequestSwagger })
    async create(@Body() body: CreateTodoDto) {
        return await this.todoService.create(body);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Exibir os dados de uma tarefa' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Dados de uma tarefa retornado com sucesso!', type: ShowTodoSwagger, })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task não foi encontrada', type: NotFoundSwagger })
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOneOrFail(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar os dados de uma tarefa' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Tarefa atualizada com sucesso!', type: UpdateTodoSwagger, })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos', type: BadRequestSwagger })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task não foi encontrada', type: NotFoundSwagger })
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto) {
        return await this.todoService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover uma tarefa' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Tarefa removida com sucesso!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task não foi encontrada', type: NotFoundSwagger })
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.todoService.deleteById(id);
    }
}
