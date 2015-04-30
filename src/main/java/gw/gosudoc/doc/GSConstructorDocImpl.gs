package gw.gosudoc.doc

uses com.sun.javadoc.ConstructorDoc
uses gw.lang.reflect.IConstructorInfo
uses gw.lang.reflect.IType

uses java.lang.Override

class GSConstructorDocImpl extends GSExecutableMemberDocImpl implements ConstructorDoc{

  var _iConstructorInfo: IConstructorInfo

  //==========PUBLIC CONSTRUCTORS==========//
  construct( ownersIntrinsicType: IType, iConstructorInfo: IConstructorInfo, rootDoc: GSRootDocImpl, clazz: GSClassDocImpl ){
    super( calculateFeatureName( iConstructorInfo ), rootDoc, clazz, ownersIntrinsicType )
    _iConstructorInfo = iConstructorInfo
  }

  //==========PUBLIC METHODS IMPLEMENTING INTERFACES==========//
  @Override
  property get Constructor(): boolean{
    return true
  }

  @Override
  function thrownExceptionTypes(): com.sun.javadoc.Type[]{
    return _iConstructorInfo.getExceptions().map( \elt -> getRootDoc().getType( elt.getExceptionType(), this ) ).toTypedArray()
  }

  @Override
  function receiverType(): com.sun.javadoc.Type{
    return null  //To change body of implemented methods use File | Settings | File Templates.
  }

  //==========PACKAGE-PRIVATE METHODS==========//
  function initialize(){
    var parameterInfos = _iConstructorInfo.getParameters()
    var parameters = processParameterInfos( parameterInfos )
    var desc = _iConstructorInfo.getDescription()
    var comments = createParamTags( _iConstructorInfo.getParameters() )
    initialize( parameters, desc, comments )
  }

  @Override
  function shouldBeIncluded(): boolean{
    var b = super.shouldBeIncluded()
    b &&= (_iConstructorInfo.isProtected() || _iConstructorInfo.isPublic())
    return b
  }

}