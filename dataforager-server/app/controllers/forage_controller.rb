require 'twitter'

class ForageController < ApplicationController

  def index
  end

  def forage
    
    #convert the accounts into an actual set of accounts
    account_strings = params["accounts"]

    account_strings.map! do |account_string|
      account_string.gsub("@","").gsub(" ", "").gsub("\r", "")
    end

    account_strings.keep_if {|account_string| account_string != ""}
    logger.debug(account_strings)
  
    #begin
    #  lists = Twitter.lists("100arguments")
    #  lists.lists.each do |list|
    #    if list.name == "dataforager"
    #      Twitter.list_destroy("100arguments", "dataforager")
    #    end
    #  end 
    #rescue InternalServerError
    #  logger.debug("Couldn't fetch set of lists. Or couldn't destroy list.")
    #  return
    #end

    begin
      listname = "dataforager" + Time.now().to_i.to_s
      list = Twitter.list_create(listname, options={:mode =>'private', :description=>"List automatically created by DataForager"})
    rescue InternalServerError
      logger.debug("Couldn't create list.")
      return
    end

    logger.debug(list)
    account_strings.each do |account_string|
      begin
        request = Twitter.list_add_members("100arguments", listname, account_string)
      rescue Exception => ex
        logger.debug("couldn't add #{account_string}")
        logger.debug(ex)
      end
      logger.debug(request)
    end
  end
end
