# Homepage (Root path)
get '/' do
  erb :index
end


get '/api/v1/contacts' do
  contacts = Contact.all
  json contacts.as_json
end

delete '/api/v1/contacts/:id' do
  contact = Contact.find(params[:id])
  contact.destroy
  json("")
end

post '/api/v1/contacts' do
  contact = Contact.new(
    firstname: params[:firstname],
    lastname: params[:lastname],
    email: params[:email],
    address: params[:address],
    phonenumber: params[:phonenumber]
  )
  contact.save
  json contact.as_json
end

get '/api/v1/contacts/search' do
  # binding.pry
  contact = Contact.where( 
    {firstname: params[:firstname]}
    )
  json contact.as_json
end