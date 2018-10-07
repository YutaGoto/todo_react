class TodosController < ApplicationController
  def index
    todos = Todo.all.to_a.map do |todo|
      { id: todo.id, title: todo.title, checked: todo.checked }
    end
    @state = { todoLists: todos }
  end

  def create
    params[:todo_lists].each do |param|
      if param[:id].present?
        Todo.find(param[:id]).update(title: param[:title], checked: param[:checked])
      else
        Todo.create(title: param[:title], checked: param[:checked])
      end
    end
    redirect_to todos_path
  end

  def fetch
    state = []
    Todo.all.each do |todo|
      state << { id: todo.id, title: todo.title, checked: todo.checked }
    end

    render json: state
  end

  def list
    @todos = Todo.all
  end
end
