class Contact < ActiveRecord::Base

  validates :firstname, presence: true, length: { maximum: 40 }
  validates :lastname, presence: true, length: { maximum: 40 }  
  validates :email, presence: true, format: /\b[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}\z/
  validates :phonenumber, presence: true
  validates :address, presence: true

end