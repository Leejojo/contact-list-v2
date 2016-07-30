class Contacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :phonenumber
      t.string :address
    end
  end
end
