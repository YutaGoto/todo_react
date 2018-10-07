Rails.application.routes.draw do
  resources :todos, only: [:index, :create] do
    collection do
      get :fetch
      get :list
    end
  end
end
