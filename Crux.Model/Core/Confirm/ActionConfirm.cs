using System;

namespace Crux.Model.Core.Confirm
{
    public class ActionConfirm
    {
        private ActionConfirm()
        {
        }

        public bool Success { get; protected set; }
        public string Message { get; set; }
        public object Value { get; set; }

        public static ActionConfirm CreateSuccess(string message)
        {
            return new ActionConfirm { Message = message, Success = true };
        }

        public static ActionConfirm CreateSuccess(object value)
        {
            return new ActionConfirm { Value = value, Success = true };
        }

        public static ActionConfirm CreateFailure(string message)
        {
            Console.WriteLine("FAIL: " + message);
            return new ActionConfirm { Message = message, Success = false };
        }
    }
}