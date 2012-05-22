require 'twitter'

class ForageController < ApplicationController

  def index
  end

  def forage
    
    #convert the accounts into an actual set of accounts
    account_strings = params["accounts"].split("\n")

    account_strings.map! do |account_string|
      account_string.gsub("@","").gsub(" ", "").gsub("\r", "")
    end

    account_strings.keep_if {|account_string| account_string != ""}
    logger.debug(account_strings)
  
    lists = Twitter.lists("100arguments")
    lists.lists.each do |list|
      if list.name == "dataforager"
        Twitter.list_destroy("100arguments", "dataforager")
      end
    end 
    list = Twitter.list_create("dataforager", options={:mode =>'private', :description=>"List automatically created by DataForager"})
    logger.debug(list)
    account_strings.each do |account_string|
      request = Twitter.list_add_members("100arguments", "dataforager", account_string)
      logger.debug(request)
    end
  end
end
