# frozen_string_literal: true

class HomeController < ApplicationController
  def landing
  end

  def sweet_home
    render({ component: "SweetHomePage" })
  end
end
