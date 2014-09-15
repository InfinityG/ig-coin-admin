require 'rack'

app = Rack::Builder.app do
  use Rack::Static,
      :urls => ['/'],
      :root => 'public',
      :index => 'index.html'

  map '/' do
    run lambda {}
  end
end

run app

# from terminal: 'rackup -p 8001' to start on port 8001