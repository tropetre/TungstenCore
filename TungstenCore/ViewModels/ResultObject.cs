namespace TungstenCore.ViewModels
{
    public class ResultObject
    {
        private bool _success;
        public bool Success
        {
            get { return _success; }
            set { _success = value; }
        }

        public ResultObject(bool success)
        {
            this._success = success;
        }

        public ResultObject() { }
    }
}
