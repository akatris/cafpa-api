class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(username: params[:session][:username])
    if user && user.authenticate(params[:session][:password])
      log_in user
      redirect_to root_path
    else
      flash.now[:danger] = 'Invalid username or password'
      render 'new'
    end
  end

  def destroy
    if logged_in?
      session.delete :user_id
      current_user = nil
    end
    redirect_to root_path
  end
end
